using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RetailBank.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RetailBank.Controllers
{
    public class ClientController : Controller
    {

        ClientDataAccessLayer objClient = new ClientDataAccessLayer();

        [HttpGet]
        [Route("api/client/home")]
        public IActionResult Home()
        {
            return View();
        }

        [HttpGet]
        [Route("api/client/all")]
        public IEnumerable<Client> All()
        {
            return objClient.GetAllClient();
        }

        [HttpPost]
        [Route("api/client/login")]
        public Client Login([FromBody] Client client)
        {
            return objClient.GetClient(client);
           
        }

        [HttpPost]
        [Route("api/client/getClientData")]
        public Client GetClientData([FromBody] int clientId)
        {
            return objClient.GetClientbyId(clientId);

        }

        [HttpPost]
        [Route("api/client/getClientDataByName")]
        public Client GetClientDatabyName([FromBody] Client client)
        {
            return objClient.GetClientDatabyName(client.ClientName);

        }



    }
}
