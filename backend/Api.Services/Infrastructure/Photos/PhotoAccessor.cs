using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Services.Infrastructure.Photos.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Api.Services.Infrastructure.Photos
{
    public class PhotoAccessor : IPhotoAccessor
    {
        public Task<PhotoUploadResult> AddPhoto(IFormFile file)
        {
            throw new NotImplementedException();
        }

        public Task<string> DeletePhoto(string publicId)
        {
            throw new NotImplementedException();
        }
    }
}