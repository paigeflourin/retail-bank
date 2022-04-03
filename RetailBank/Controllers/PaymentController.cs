using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RetailBank.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RetailBank.Controllers
{
    public class PaymentController : Controller
    {
        ClientDataAccessLayer objClient = new ClientDataAccessLayer();

        [HttpPost]
        [Route("api/payment/pay")]
        public int Pay([FromBody] Client client)
        {
            return objClient.UpdateClientRec(client);

        }

        [HttpPost]
        [Route("api/client/updateRecipientBalance")]
        public int UpdateRecipientBalance([FromBody] Client client)
        {
            return objClient.UpdateRecipientBalance(client);

        }

        
    }
}
