const UserFollowProject = require("../models/UserFollowProject");
const Project = require("../models/Project");
const User = require("../models/User");
const Notification = require("../models/Notification");

module.exports = class NotificationController {
  // Método para notificar os seguidores
  static async notifyProjectFollowers(projectId, updateDetails) {
    
    console.log("criando mensagem....\n", updateDetails)

    try {
      const project = await Project.findByPk(projectId);

      const user = await User.findByPk(project.UserId);

      const followers = await UserFollowProject.findAll({
        where: { projectId },
        raw: true
        // include: [{ model: User, as: 'Followers', attributes: ["id", "email"] }],
      });

      console.log(followers);

      // Criar uma mensagem de notificação
      const message = `O projeto ${project.destination} de ${user.name} foi atualizado: ${updateDetails}`;

      // Gerar notificações para cada seguidor
      const notifications = followers.map((follower) => ({
        message,
        UserId: follower.userId,
        ProjectId: follower.projectId,
      }));

      console.log(notifications)

      await Notification.bulkCreate(notifications);
    } catch (error) {
      console.error("Erro ao notificar seguidores do projeto: ", error);
    }
  }

  // Método para notificar os seguidores do usuário quando ele atualizar seus projetos
  static async notifyUserFollowersOnProjectUpdate(userId, projectId, details) {
    try {
      // Obtém o usuário que fez a atualização
      const user = await User.findByPk(userId);

      const project = await Project.findByPk(projectId);

      if (!user) {
        console.error("Usuário não encontrado para notificação.");
        return;
      }

      // Obtém todos os seguidores do usuário
      const followers = await UserFollowProject.findAll({
        where: { userId },
        raw: true
      });

      // Cria uma mensagem de notificação
      const message = `O usuário ${user.name} ${details} projeto para ${project.destination}.`;

      // Gera notificações para cada seguidor do usuário
      const notifications = followers.map((follower) => ({
        message,
        UserId: follower.userId, // ID do seguidor
        ProjectId: projectId
      }));

      // Cria as notificações em massa
      await Notification.bulkCreate(notifications);
    } catch (error) {
      console.error("Erro ao notificar seguidores do usuário: ", error);
    }
  }

  static async getUserNotifications(req, res) {
    const userId = req.session.userid;

    try {
      const notifications = await Notification.findAll({
        where: { userId },
        order: [["createdAt", "DESC"]],
      });
      return res.status(200).send({ notifications });
    } catch (error) {
      console.error("Erro ao obter notificações: ", error);
      return res.status(500).send("Erro interno do servidor");
    }
  }

  static async markAsRead(req, res) {
    const notificationId = req.params.notificationId;

    try {
      const notification = await Notification.findByPk(notificationId);
      if (!notification)
        return res.status(404).send("Notificação não encontrada.");

      notification.read = true;
      await notification.save();

      return res
        .status(200)
        .send({ message: "Notificação marcada como lida." });
    } catch (error) {
      console.error("Erro ao marcar notificação como lida: ", error);
      return res.status(500).send("Erro interno do servidor");
    }
  }
};
