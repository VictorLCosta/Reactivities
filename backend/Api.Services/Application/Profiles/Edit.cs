using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Api.Domain.DTOs.Profile;
using Api.Domain.Entities;
using Api.Services.Application.Core;
using Api.Services.Infrastructure.Security;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Api.Services.Application.Profiles
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public ProfileDto Profile { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly IUserAccessor _userAccessor;

            public Handler(UserManager<AppUser> userManager, IUserAccessor userAccessor)
            {
                _userManager = userManager;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user == null) return Result<Unit>.Failed("User not found");

                user.DisplayName = request.Profile.DisplayName;
                user.Bio = request.Profile.Bio;

                var result = await _userManager.UpdateAsync(user);

                if (result.Succeeded)
                    return Result<Unit>.Success(Unit.Value);
                else 
                    return Result<Unit>.Failed("Update profile failed");
            }
        }
    }
}