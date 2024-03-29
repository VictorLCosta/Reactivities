using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Services.Application.Core
{
    public class ActivityParams : PagingParams
    {
        public bool IsHost { get; set; }
        public bool IsGoing { get; set; }
        public DateTime StartDate { get; set; } = DateTime.UtcNow;
    }
}