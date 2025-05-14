const User = require('../models/User')
const Project = require('../models/Project')
const Review = require('../models/Review')

module.exports = class ReviewController {

    static async getReview(req, res) {
        try {
            const { id } = req.params;

            const review = await Review.findOne({ where: { id } });

            if (!review) {
                return res.status(404).send('Avaliação não encontrada.')
            };

            req.session.save(() => {
                return res.status(200).send(review);
            });

        } catch (error) {
            console.error(`Erro ao buscar avaliação: ${error}`)
            return res.status(500).send('Server error.')
        }
    }

    static async findAllByProject(req, res) {

        try {
            const { projectId } = req.params;

            const reviews = await Review.findAll({
                where: { ProjectId: projectId },
                raw: true
            });

            if (!reviews || reviews.length === 0) {
                return res.status(404).send('Avaliações não encontradas para o projeto.')
            }

            req.session.save(() => {
                return res.status(200).send(reviews);
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send(`Erro no servidor.`);
        }
    }

    static async createReview(req, res) {
        try {
            const user = await User.findOne({
                where: { id: req.session.userid },
                raw: true,
            })

            if (!user) {
                return res.status(400).send('Usuário não encontrado.');
            }

            const newReview = await Review.create({
                grade: req.body.grade,
                description: req.body.description,
                UserId: user.id,
                ProjectId: req.body.ProjectId,
            })
            console.log(newReview)

            req.session.save(() => {
                res.redirect(`/project/${req.body.ProjectId}`)
            });

        } catch (err) {
            console.error(error);
            return res.status(500).send('Erro ao criar avaliação.');
        }
    }

    static async removeReview(req, res) {
        const { id, projectId } = req.params;
        const userId = req.session.userid;
    
        try {
            // Busca a review pelo ID
            const review = await Review.findOne({ where: { id: id } });
    
            if (!review) {
                return res.status(404).send('Avaliação não encontrada.');
            }
    
            // Verifica se o usuário da sessão é o autor da review
            if (review.UserId !== userId) {
                return res.status(403).send('Você não tem permissão para excluir esta avaliação.');
            }
    
            // Se for o autor, exclui a avaliação
            await Review.destroy({ where: { id: id } });
    
            req.session.save(() => {
                return res.status(200).send({ message: 'Avaliação excluída com sucesso.'});
            });
    
        } catch (error) {
            console.error(`Erro ao excluir a avaliação: ${error}`);
            return res.status(500).send('Erro interno do servidor');
        }
    }

    static async updateReview(req, res) {
        const { id } = req.params;
        const { grade, description } = req.body; // ProjectId, grade e description continuam no body
        const userId = req.session.userid;
    
        const updatedReview = {
            grade: grade,
            description: description,
        };
    
        try {
            const review = await Review.findOne({ where: { id: id } });
    
            if (!review) {
                return res.status(404).send('Avaliação não encontrada.');
            }
    
            if (review.UserId !== userId) {
                return res.status(403).send('Você não tem permissão para atualizar esta avaliação.');
            }
    
            await Review.update(updatedReview, { where: { id: id } });
    
            req.session.save(() => {
                return res.status(200).send('Avaliação atualizada com sucesso.')
            });
    
        } catch (error) {
            console.error('Erro ao atualizar avaliação: ' + error);
            res.status(500).send('Erro interno do servidor.');
        }
    }
}