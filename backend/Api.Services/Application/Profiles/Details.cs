using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Api.Data;
using Api.Domain.DTOs.Profile;
using Api.Services.Application.Core;
using Api.Services.Infrastructure.Security;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Api.Services.Application.Profiles
{
    public class Details
    {
        public class Query : IRequest<Result<ProfileDto>>
        {
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<ProfileDto>>
        {
            private readonly ApplicationDbContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(ApplicationDbContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<Result<ProfileDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                    .ProjectTo<ProfileDto>(_mapper.ConfigurationProvider, new { currentUsername = _userAccessor.GetUsername() })
                    .SingleOrDefaultAsync(x => x.Username == request.Username);

                if (user == null) return null;

                return Result<ProfileDto>.Success(user);
            }
        }
    }
}