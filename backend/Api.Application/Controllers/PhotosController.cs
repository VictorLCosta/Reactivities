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

        [HttpDelete("{publicId}")]
        public async Task<IActionResult> Delete(string publicId)
        {
            var result = await Mediator.Send(new Delete.Query { PublicId = publicId });

            return HandleResult(result);
        }

        [HttpPost("{publicId}/setMain")]
        public async Task<IActionResult> SetMain(string publicId)
        {
            var result = await Mediator.Send(new SetMain.Command { PublicId = publicId });

            return HandleResult(result);
        }
    }
}