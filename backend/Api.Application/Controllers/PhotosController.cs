using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Api.Services.Application.Photos;
using Microsoft.AspNetCore.Mvc;

namespace Api.Application.Controllers
{
    public class PhotosController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> Add([FromForm] Add.Command command)
        {
            var result = await Mediator.Send(command);

            return HandleResult(result);
        }
    }
}