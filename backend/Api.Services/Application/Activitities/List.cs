using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Api.Data.Transaction;
using Api.Domain.DTOs.Activity;
using Api.Domain.Entities;
using Api.Services.Application.Core;
using Api.Services.Infrastructure.Security;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Api.Services.Application.Activitities
{
    public class List
    {
        public class Query : IRequest<Result<IEnumerable<ActivityDto>>> {}

        public class Handler : IRequestHandler<Query, Result<IEnumerable<ActivityDto>>>
        {
            private readonly IUow _unitOfWork;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(IUow unitOfWork, IMapper mapper, IUserAccessor userAccessor)
            {
                _unitOfWork = unitOfWork;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<Result<IEnumerable<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = await _unitOfWork
                    .Activities
                    .AsQueryable()
                    .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider, new { currentUsername = _userAccessor.GetUsername() })
                    .ToListAsync();

                return Result<IEnumerable<ActivityDto>>.Success(activities);
            }
        }
    }
}