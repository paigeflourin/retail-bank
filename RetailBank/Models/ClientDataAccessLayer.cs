using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RetailBank.Models
{
    public class ClientDataAccessLayer
    {
        RetailbankContext db = new RetailbankContext();


        public IEnumerable<Client> GetAllClient()
        {
            try
            {
                return db.Clients.ToList();
            }
            catch
            {
                return null;
            }
        }

        public Client GetClient(Client client)
        {
            try
            {
                Client rtnClient = db.Clients.Where(u => u.ClientName == client.ClientName).FirstOrDefault();

                if(rtnClient == null)
                {
                    rtnClient = AddClient(client);
                }

                return rtnClient;
            }
            catch
            {
                return null;
            }
        }

        public Client AddClient(Client client)
        {
            try
            {
                var t = db.Clients.Add(client);
                db.SaveChanges();

                int id = client.Id;
                return client;
            }
            catch
            {
                return null;
            }
        }

        public Client GetClientbyId(int clientId)
        {
            try
            {
                return db.Clients.Find(clientId);
            }
            catch
            {
                return null;
            }
        }

        public int UpdateClientRec(Client client)
        {
            try
            {
                db.Entry(client).State = EntityState.Modified;
                db.SaveChanges();


                return 1;
            }
            catch
            {
                throw;
            }
        }


        
        public Client GetClientDatabyName(string clientName)
        {
            try
            {
                Client rtnClient = db.Clients.Where(u => u.ClientName == clientName).FirstOrDefault();

                return rtnClient;
            }
            catch
            {
                return null;
            }
        }
        public int UpdateRecipientBalance(Client client)
        {
            try
            {
                Client rtnClient = db.Clients.Where(u => u.ClientName == client.ClientName).FirstOrDefault();


                db.Entry(rtnClient).State = EntityState.Modified;
                db.SaveChanges();


                return 1;
            }
            catch
            {
                return 0;
            }
        }





    }
}
