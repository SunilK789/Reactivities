using System.Linq;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Profile = Application.Profiles.Profile;

namespace Application.Followers
{
    public class List
    {
        public class Query : IRequest<Result<List<Profile>>>
        {
            public string Predicate { get; set; }
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<Profile>>>
        {
            private readonly IMapper _mapper;
            public DataContext _context { get; }
            public IUserAccessor _userAccessor { get; }
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<Profile>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var profiles = new List<Profile>();

                switch (request.Predicate)
                {
                    case "followers":
                        profiles = await _context.UserFollowings.Where(w => w.Target.UserName == request.Username)
                        .Select(s => s.Observer)
                        .ProjectTo<Profile>(_mapper.ConfigurationProvider, new { currentUserName = _userAccessor.GetUsername() })
                        .ToListAsync();
                        break;


                    case "following":
                        profiles = await _context.UserFollowings.Where(w => w.Observer.UserName == request.Username)
                        .Select(s => s.Target)
                        .ProjectTo<Profile>(_mapper.ConfigurationProvider)
                        .ToListAsync();
                        break;
                }

                return Result<List<Profile>>.Success(profiles);
            }
        }
    }
}