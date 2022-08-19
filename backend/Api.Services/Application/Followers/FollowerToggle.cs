using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Api.Data.Transaction;
using Api.Domain.Entities;
using Api.Services.Application.Core;
using Api.Services.Infrastructure.Security;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Api.Services.Application.Followers
{
    public class FollowerToggle
    {
        public class Command : IRequest<Result<Unit>> 
        {
            public string TargetUsername { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly IUow _uow;
            private readonly UserManager<AppUser> _userManager;
            private readonly IUserAccessor _userAccessor;

            public Handler(IUow uow, UserManager<AppUser> userManager, IUserAccessor userAccessor)
            {
                _uow = uow;
                _userManager = userManager;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var observer = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                var target = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == request.TargetUsername);

                if (target == null) return null;

                var following = await _uow.UserFollowings
                    .FindBy(x => x.ObserverId == observer.Id && x.TargetId == target.UserName)
                    .FirstOrDefaultAsync();

                if (following == null) 
                {
                    following = new UserFollowing
                    {
                        Observer = observer,
                        Target = target
                    };

                    await _uow.UserFollowings.AddAsync(following);
                } 
                else
                {
                    var result = await _uow.UserFollowings.Remove(following.Id);
                    if (!result) return Result<Unit>.Failed("Failed to remove following");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}