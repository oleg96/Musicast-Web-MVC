using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Musicast_Web_MVC.Models;

namespace Musicast_Web_MVC.Hubs
{
    public class ChatHub : Hub
    {
        static List<User> Users = new List<User>();

        AppContext dbm = new AppContext();

        public void GetAllMessages()
        {
            foreach (Message msg in dbm.Messages)
            {
                string dateTime = DateTime.Parse(msg.DateTime.ToString()).ToString("dd.MM.yyyy H:mm:ss");
                string messageWithSmiles = msg.UserMessage;
                messageWithSmiles = messageWithSmiles.Replace("#angry", "<img class='smile' src='/Smiles/angry.ico' alt='angry' />");
                messageWithSmiles = messageWithSmiles.Replace("#checkmark", "<img class='smile' src='/Smiles/checkmark.ico' alt='checkmark' />");
                messageWithSmiles = messageWithSmiles.Replace("#cross", "<img class='smile' src='/Smiles/cross.ico' alt='cross' />");
                messageWithSmiles = messageWithSmiles.Replace("#grin", "<img class='smile' src='/Smiles/grin.ico' alt='grin' />");
                messageWithSmiles = messageWithSmiles.Replace("#love", "<img class='smile' src='/Smiles/love.ico' alt='love' />");
                messageWithSmiles = messageWithSmiles.Replace("#point", "<img class='smile' src='/Smiles/point.ico' alt='point' />");
                messageWithSmiles = messageWithSmiles.Replace("#sad", "<img class='smile' src='/Smiles/sad.ico' alt='sad' />");
                messageWithSmiles = messageWithSmiles.Replace("#smile", "<img class='smile' src='/Smiles/smile.ico' alt='smile' />");
                messageWithSmiles = messageWithSmiles.Replace("#thumbsup", "<img class='smile' src='/Smiles/thumbsup.ico' alt='thumbsup' />");
                messageWithSmiles = messageWithSmiles.Replace("#thumbsdown", "<img class='smile' src='/Smiles/thumbsdown.ico' alt='thumbsdown' />");
                Clients.Caller.addMessage(msg.Author, messageWithSmiles, dateTime);
            }
        }
        // Отправка сообщений
        public void Send(string name, string message)
        {
            Message msg = new Message();
            msg.Author = name;
            msg.DateTime = DateTime.Now;
            string messageWithSmiles = message;
            messageWithSmiles = messageWithSmiles.Replace("#angry", "<img class='smile' src='/Smiles/angry.ico' alt='angry' />");
            messageWithSmiles = messageWithSmiles.Replace("#checkmark", "<img class='smile' src='/Smiles/checkmark.ico' alt='checkmark' />");
            messageWithSmiles = messageWithSmiles.Replace("#cross", "<img class='smile' src='/Smiles/cross.ico' alt='cross' />");
            messageWithSmiles = messageWithSmiles.Replace("#grin", "<img class='smile' src='/Smiles/grin.ico' alt='grin' />");
            messageWithSmiles = messageWithSmiles.Replace("#love", "<img class='smile' src='/Smiles/love.ico' alt='love' />");
            messageWithSmiles = messageWithSmiles.Replace("#point", "<img class='smile' src='/Smiles/point.ico' alt='point' />");
            messageWithSmiles = messageWithSmiles.Replace("#sad", "<img class='smile' src='/Smiles/sad.ico' alt='sad' />");
            messageWithSmiles = messageWithSmiles.Replace("#smile", "<img class='smile' src='/Smiles/smile.ico' alt='smile' />");
            messageWithSmiles = messageWithSmiles.Replace("#thumbsup", "<img class='smile' src='/Smiles/thumbsup.ico' alt='thumbsup' />");
            messageWithSmiles = messageWithSmiles.Replace("#thumbsdown", "<img class='smile' src='/Smiles/thumbsdown.ico' alt='thumbsdown' />");
            msg.UserMessage = messageWithSmiles;
            dbm.Messages.Add(msg);
            dbm.SaveChanges();
            string nowDateTime = DateTime.Now.ToString("dd.MM.yyyy H:mm:ss");
            Clients.All.addMessage(name, messageWithSmiles, nowDateTime);
        }

        // Подключение нового пользователя
        public void Connect(string userName)
        {
            var id = Context.ConnectionId;


            if (!Users.Any(x => x.ConnectionId == id))
            {
                Users.Add(new User { ConnectionId = id, Name = userName });

                // Посылаем сообщение текущему пользователю
                Clients.Caller.onConnected(id, userName, Users);

                // Посылаем сообщение всем пользователям, кроме текущего
                Clients.AllExcept(id).onNewUserConnected(id, userName);

                GetAllMessages();
            }
        }

        // Отключение пользователя
        public override System.Threading.Tasks.Task OnDisconnected(bool stopCalled)
        {
            var item = Users.FirstOrDefault(x => x.ConnectionId == Context.ConnectionId);
            if (item != null)
            {
                Users.Remove(item);
                var id = Context.ConnectionId;
                Clients.All.onUserDisconnected(id, item.Name);
            }

            return base.OnDisconnected(stopCalled);
        }

        // Typing event
        public void Typing(string userName)
        {
            var id = Context.ConnectionId;
            // Посылаем сообщение всем пользователям, кроме текущего
            Clients.AllExcept(id).onTypingMessage(userName);
        }
    }
}