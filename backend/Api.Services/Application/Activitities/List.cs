using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Api.Data.Transaction;
using Api.Domain.DTOs.Activity;
using Api.Domain.Entities;
using Api.Services.Application.Core;
using AutoMapper;
using MediatR;

namespace Api.Services.Application.Activitities
{
    public class List
    {
        public class Query : IRequest<Result<IEnumerable<ActivityDto>>> {}

        public class Handler : IRequestHandler<Query, Result<IEnumerable<ActivityDto>>>
        {
            private readonly IUow _unitOfWork;
            private readonly IMapper _mapper;

            public Handler(IUow unitOfWork, IMapper mapper)
            {
                _unitOfWork = unitOfWork;
                _mapper = mapper;
            }

            public async Task<Result<IEnumerable<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = await _unitOfWork.Activities.ListAllAsync();

                var result = _mapper.Map<IEnumerable<ActivityDto>>(activities);

                return Result<IEnumerable<ActivityDto>>.Success(result);
            }
        }
    }
}