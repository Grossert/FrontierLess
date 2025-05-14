const Project = require("../models/Project");
const ProjectItem = require("../models/ProjectItem");
const User = require("../models/User");
const Review = require("../models/Review");
const UserFollowProject = require("../models/UserFollowProject");
const NotificationController = require('../controllers/NotificationController')

const { Op, fn, col, literal } = require("sequelize");

module.exports = class ProjectController {
  
  static async getProject(req, res) {
    const id = req.params.id;

    try {
      const project = await Project.findOne({
        where: { id: id },
        raw: true,
      });

      if (!project) {
        return res.status(404).send("Projeto não encontrado");
      }

      const user = await User.findOne({
        where: { id: project.UserId },
        raw: true,
      });

      const projectItems = await ProjectItem.findAll({
        where: { ProjectId: project.id },
        raw: true,
      });

      const budget = projectItems.reduce(
        (total, item) => total + parseFloat(item.cost || 0),
        0
      );

      const reviews = await Review.findAll({
        where: { ProjectId: project.id },
        raw: true,
      });

      reviews.forEach((review) => {
        if (review.UserId === req.session.userid) {
          review.isMyReview = true;
        } else {
          review.isMyReview = false;
        }
      });

      const isMyProject = project.UserId === req.session.userid;

      req.session.save(() => {
        return res
          .status(200)
          .send({ project, isMyProject, budget, user, projectItems, reviews });
      });
    } catch (err) {
      console.error("Erro ao buscar projeto: ", err);
      return res.status(500).send("Erro interno do servidor");
    }
  }

  static async getAllProjects(req, res) {
    console.log("Buscando projetos");

    let destination = req.query.destination ? req.query.destination : "";
    let status = req.query.status ? req.query.status : "";
    let exchangeType = req.query.exchangeType ? req.query.exchangeType : "";
    let minBudget = req.query.minBudget ? parseFloat(req.query.minBudget) : 0;
    let maxBudget = req.query.maxBudget
      ? parseFloat(req.query.maxBudget)
      : Number.MAX_SAFE_INTEGER;
    let orderField = req.query.orderField ? req.query.orderField : "createdAt"; // Campo de ordenação
    let orderDirection = req.query.orderDirection
      ? req.query.orderDirection
      : "ASC"; // Direção de ordenação

    try {
      const projectsData = await Project.findAll({
        attributes: [
          "id",
          "destination",
          "status",
          "exchangeType",
          "createdAt",
          "updatedAt",
          "UserId",
          [fn("SUM", col("ProjectItems.cost")), "budget"], // Soma do orçamento
        ],
        include: [
          {
            model: User,
            attributes: ["id", "name", "email"],
          },
          {
            model: ProjectItem,
            attributes: [],
          },
        ],
        where: {
          destination: { [Op.like]: `%${destination}%` },
          status: { [Op.like]: `%${status}%` },
          exchangeType: { [Op.like]: `%${exchangeType}%` },
          [Op.and]: [
            literal(
              `IFNULL((SELECT SUM(ProjectItems.cost) FROM ProjectItems WHERE ProjectItems.ProjectId = Project.id), 0) BETWEEN ${minBudget} AND ${maxBudget}`
            ),
          ],
        },
        group: ["Project.id", "User.id"],
        order: [[literal(`\`${orderField}\``), orderDirection]], // Ordenar pelo campo definido
      });

      const projects = projectsData.map((result) =>
        result.get({ plain: true })
      );

      req.session.save(() => {
        return res.status(200).send({ projects });
      });
    } catch (error) {
      console.error("Erro ao buscar projetos: ", error);
      return res.status(500).send("Erro interno do servidor");
    }
  }

  static async createProject(req, res) {
    const { destination, exchangeType } = req.body;
    let user = User.findByPk(req.session.userid)

    const newProject = {
      destination: destination,
      status: "progredindo",
      exchangeType: exchangeType,
      UserId: req.session.userid,
    };

    try {
      await Project.create(newProject);

      await NotificationController.notifyUserFollowersOnProjectUpdate(user.id, newProject.id, 'criou um ');

      req.session.save(() => {
        return res
          .status(200)
          .send({ message: "Projeto criado com sucesso.", newProject });
      });


    } catch (err) {
      console.error(err);
      return res.status(500).send("Erro ao criar projeto");
    }
  }

  static async removeProject(req, res) {
    const id = req.params.id;
    const userId = req.session.userid;

    try {
      await Project.destroy({ where: { id: id, UserId: userId } });
      req.session.save(() => {
        return res
          .status(200)
          .send({ message: "Projeto excluído com sucesso" });
      });
    } catch (err) {
      console.log(`Erro ao excluir o projeto: ${err}`);
      return res.status(500).send("Erro interno do servidor");
    }
  }

  static async updateProject(req, res) {
    const id = req.params.id;
    const user = User.findByPk(req.session.userid)

    console.log(req.params)
    console.log(req.body)

    const updatedProject = {
      destination: req.body.destination,
      exchangeType: req.body.exchangeType,
      status: req.body.status,
    };

    try {
      await Project.update(updatedProject, {
        where: { id, UserId: req.session.userid },
      });

      await NotificationController.notifyUserFollowersOnProjectUpdate(user.id, id, `atualizou o`);
      await NotificationController.notifyProjectFollowers(id);

      req.session.save(() => {
        return res
          .status(200)
          .send({ message: "Projeto atualizado com sucesso", updatedProject });
      });
    } catch (err) {
      console.log("Erro ao atualizar projeto: " + err);
      return res.status(500).send("Erro interno do servidor");
    }
  }

  // Seguir um projeto
  static async followProject(req, res) {
    const projectId = req.body.projectId; // ID do projeto a ser seguido
    const userId = req.session.userid; // ID do usuário que está seguindo

    try {
      await UserFollowProject.create({ userId, projectId });

      req.session.save(() => {
        return res
          .status(200)
          .send({ message: "Agora você está seguindo este projeto." });
      });
    } catch (error) {
      console.error("Erro ao seguir o projeto: ", error);
      return res.status(500).send("Erro interno do servidor");
    }
  }

  //Desacompanhar projeto
  static async unfollowProject(req, res) {
    const projectId = req.params.id;
    const userId = req.session.userid;
    try {
      await UserFollowProject.destroy({ where: { userId, projectId } });

      req.session.save(() => {
        return res
          .status(200)
          .send({ message: "Agora você não está mais seguindo este projeto." });
      });
    } catch (error) {
      console.error("Erro ao abandonar o projeto: ", error);
      return res.status(500).send("Erro interno do servidor");
    }
  }

  // Listar seguidores do projeto
  static async getProjectFollowers(req, res) {
    const projectId = req.params.projectId;

    try {
      const project = await Project.findByPk(projectId, {
        include: {
          model: User,
          as: "Followers", // Usa o alias correto
          attributes: ["id", "name", "email"],
        },
      });

      if (!project) {
        return res.status(404).send("Projeto não encontrado");
      }

      const followers = project.Followers.map((user) =>
        user.get({ plain: true })
      );

      return res.status(200).send(followers);
    } catch (error) {
      console.error("Erro ao obter seguidores do projeto: ", error);
      return res.status(500).send("Erro interno do servidor");
    }
  }

  // Listar projetos seguidos pelo usuário
  static async getFollowedProjects(req, res) {
    const userId = req.params.userId;

    try {
      const user = await User.findByPk(userId, {
        include: [
          {
            model: Project,
            as: "FollowedProjects", // Usa o alias definido na associação
            attributes: ["id", "destination", "status", "exchangeType"],
            through: { attributes: [] }, // Ignora os atributos da tabela de junção
          },
        ],
      });

      if (!user) {
        return res.status(404).send("Usuário não encontrado");
      }

      return res.status(200).send(user.FollowedProjects);
    } catch (error) {
      console.error("Erro ao obter projetos seguidos pelo usuário: ", error);
      return res.status(500).send("Erro interno do servidor");
    }
  }

};
