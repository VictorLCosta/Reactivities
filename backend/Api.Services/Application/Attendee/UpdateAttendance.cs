using System;
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

namespace Api.Services.Application.Attendee
{
    public class UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>> 
        {
            public Guid Id { get; set; }
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
                var activity = await _uow.Activities.GetByIdAsync(request.Id);

                if (activity == null) return null;

                var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user == null) return null;

                var hostUserName = activity.Attendees.FirstOrDefault(x => x.IsHost)?.AppUser?.UserName;

                var attendance = activity.Attendees.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

                if (attendance != null && hostUserName == user.UserName)
                    activity.Attendees.Remove(attendance);

                if (attendance == null) 
                {
                    attendance = new ActivityAttendee
                    {
                        AppUser = user,
                        Activity = activity,
                        IsHost = false
                    };

                    activity.Attendees.Add(attendance);
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}