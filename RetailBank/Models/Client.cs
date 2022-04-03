using System;
using System.Collections.Generic;

#nullable disable

namespace RetailBank.Models
{
    public partial class Client
    {
        public int Id { get; set; }
        public string ClientName { get; set; }
        public string ClientPw { get; set; }
        public decimal? ClientBalance { get; set; }
        public decimal? ClientOwes { get; set; }
        public string ClientOwesTo { get; set; }
        public decimal? ClientOwesFromAmount { get; set; }
        public string ClientOwesFrom { get; set; }
    }
}
