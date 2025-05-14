const ProjectItem = require('../models/ProjectItem');
const Project = require('../models/Project');
const NotificationController = require('../controllers/NotificationController')

module.exports = class ProjectItemController {

    // Encontra um ProjectItem por ID
    static async getProjectItem(req, res) {
        try {
            const { id } = req.params;

            const projectItem = await ProjectItem.findOne({ where: { id } });

            if (!projectItem) {
                return res.status(404).send('ProjectItem not found');
            }

            req.session.save(() => {
                return res.status(200).send(projectItem);
            });

        } catch (error) {
            console.error('Erro ao buscar item do projeto: ', error);
            return res.status(500).send('Server Error');
        }
    }

    // Encontra todos os ProjectItems filtrados por Project
    static async findAllByProject(req, res) {
        try {
            const { projectId } = req.params;

            const projectItems = await ProjectItem.findAll({
                where: { ProjectId: projectId },
                raw: true
            });

            if (!projectItems || projectItems.length === 0) {
                return res.status(404).send('No ProjectItems found for the given project');
            }

            req.session.save(() => {
                return res.status(200).send(projectItems);
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send('Server Error');
        }
    }

    // Cria um novo ProjectItem
    static async createProjectItem(req, res) {
        try {
            const projectItem = req.body;

            if (!projectItem.name || !projectItem.ProjectId) {
                return res.status(400).send('Name and projectId are required');
            }

            const project = Project.findByPk(req.body.ProjectId)

            const newProjectItem = await ProjectItem.create({
                name: projectItem.name,
                cost: projectItem.cost,
                description: projectItem.description,
                ProjectId: projectItem.ProjectId
            });

            // Notificar seguidores do projeto após criação bem-sucedida
            await NotificationController.notifyProjectFollowers(projectItem.ProjectId, `Um novo item foi adicionado ao projeto.`);

            req.session.save(() => {
                return res.status(200).send({ message: 'Item criado com sucesso.', newProjectItem });
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send('Erro ao criar item');
        }
    }

    // Remove um ProjectItem
    static async removeProjectItem(req, res) {
        const id = req.params.id;
        const userId = req.session.userid;

        try {
            // Verifica se o ProjectItem pertence a um projeto do usuário
            const projectItem = await ProjectItem.findOne({ where: { id }, raw: true });
            if (!projectItem) {
                return res.status(404).send('Item não encontrado');
            }

            const project = await Project.findOne({ where: { id: projectItem.ProjectId, UserId: userId }, raw: true });
            if (!project) {
                return res.status(403).send('Você não tem permissão para remover este item');
            }

            // Notificar seguidores do projeto após remoção bem-sucedida
            await NotificationController.notifyProjectFollowers(projectItem.ProjectId, `Um item foi removido do projeto.`);

            await ProjectItem.destroy({ where: { id } });
            req.session.save(() => {
                return res.status(200).send({ message: 'ProjectItem excluído com sucesso.' });
            });
        } catch (error) {
            console.log(`Erro ao excluir o item do projeto: ${error}`);
            return res.status(500).send('Erro interno do servidor');
        }
    }

    // Atualiza um ProjectItem
    static async updateProjectItem(req, res) {
        const id = req.params.id;
        const userId = req.session.userid;

        const updatedProjectItem = {
            name: req.body.name,
            cost: req.body.cost,
            description: req.body.description,
        };

        try {
            const projectItem = await ProjectItem.findOne({ where: { id }, raw: true });
            if (!projectItem) return res.status(404).send('Item não encontrado');

            const project = await Project.findOne({ where: { id: projectItem.ProjectId, UserId: userId }, raw: true });
            if (!project) return res.status(403).send('Você não tem permissão para atualizar este item');

            await ProjectItem.update(updatedProjectItem, { where: { id } });

            // Notificar seguidores do projeto após atualização bem-sucedida
            await NotificationController.notifyProjectFollowers(projectItem.ProjectId, `Um item foi atualizado no projeto no projeto.`);

            req.session.save(() => {
                return res.status(200).send({ message: 'Item atualizado com sucesso.', updatedProjectItem });
            });
        } catch (error) {
            console.log('Erro ao atualizar item do projeto: ' + error);
            return res.status(500).send('Erro interno do servidor');
        }
    }
};
