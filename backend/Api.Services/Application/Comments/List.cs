using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Api.Data.Transaction;
using Api.Domain.DTOs.Comment;
using Api.Services.Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Api.Services.Application.Comments
{
    public class List
    {
        public class Query : IRequest<Result<List<CommentDto>>> 
        {
            public Guid ActivityId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<CommentDto>>>
        {
            private readonly IUow _uow;
            private readonly IMapper _mapper;

            public Handler(IUow uow, IMapper mapper)
            {
                _uow = uow;
                _mapper = mapper;
            }

            public async Task<Result<List<CommentDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var comments = await _uow.Comments
                    .FindBy(x => x.ActivityId == request.ActivityId)
                    .OrderBy(x => x.CreatedAt)
                    .ProjectTo<CommentDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();

                return Result<List<CommentDto>>.Success(comments);
            }
        }
    }
}