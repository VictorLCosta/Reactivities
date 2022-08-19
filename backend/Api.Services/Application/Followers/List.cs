using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Api.Data.Transaction;
using Api.Domain.DTOs.Profile;
using Api.Services.Application.Core;
using Api.Services.Infrastructure.Security;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Api.Services.Application.Followers
{
    public class List
    {
        public class Query : IRequest<Result<List<ProfileDto>>> 
        {
            public string Predicate { get; set; }
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<ProfileDto>>>
        {
            private readonly IUow _uow;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(IUow uow, IMapper mapper, IUserAccessor userAccessor)
            {
                _uow = uow;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<Result<List<ProfileDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var profiles = new List<ProfileDto>();

                switch (request.Predicate)
                {
                    case "followers":
                        profiles = await _uow.UserFollowings
                            .FindBy(x => x.Target.UserName == request.Username)
                            .Select(x => x.Observer)
                            .ProjectTo<ProfileDto>(_mapper.ConfigurationProvider, new { currentUsername = _userAccessor.GetUsername() })
                            .ToListAsync();
                        break;

                    case "following":
                        profiles = await _uow.UserFollowings
                            .FindBy(x => x.Observer.UserName == request.Username)
                            .Select(x => x.Target)
                            .ProjectTo<ProfileDto>(_mapper.ConfigurationProvider, new { currentUsername = _userAccessor.GetUsername() })
                            .ToListAsync();
                        break;
                }

                return Result<List<ProfileDto>>.Success(profiles);

            }
        }
    }
}