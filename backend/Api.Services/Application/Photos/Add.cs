using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Api.Data;
using Api.Domain.Entities;
using Api.Services.Application.Core;
using Api.Services.Infrastructure.Photos.Interfaces;
using Api.Services.Infrastructure.Security;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Api.Services.Application.Photos
{
    public class Add
    {
        public class Command : IRequest<Result<Photo>> 
        {
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Photo>>
        {
            private readonly IUserAccessor _userAccessor;
            private readonly IPhotoAccessor _photoAccessor;
            private readonly ApplicationDbContext _context;

            public Handler(IUserAccessor userAccessor, IPhotoAccessor photoAccessor, ApplicationDbContext context)
            {
                _userAccessor = userAccessor;
                _photoAccessor = photoAccessor;
                _context = context;
            }

            public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                    .Include(x => x.Photos)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user == null) return null;

                var photoUploadResult = await _photoAccessor.AddPhoto(request.File);

                var photo = new Photo
                {
                    Url = photoUploadResult.Url,
                    PublicId = photoUploadResult.PublicId
                };

                if (!user.Photos.Any()) photo.IsMain = true;
                user.Photos.Add(photo);

                return Result<Photo>.Success(photo);
            }
        }
    }
}