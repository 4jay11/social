import {assets} from '../components/images/assets'

export const users = [
  {
    "user_id": "1",
    "username": "john_doe",
    "name": "John Doe",
    "profile_image": assets.profile1,
    "location": "New York, USA",
    "followers_count": 250,
    "following_count": 150,
    "post_count": 8,
    "description": "Photographer",
    "is_following": true,
    "profile_visibility": "public",
    "posts_visibility": "public",
    "followers_visibility": "followers_only",
    "following_visibility": "followers_only",
    "posts": [
      {
        "post_id": "101",
        "image_url":assets.feed1,
        "caption": "Amazing sunset!",
        "posted_time": "2024-08-10T12:00:00Z",
        "likes": ["1", "2", "4", "5", "7"],
        "comments": [
          {
            "user_id": "2",
            "username": "emily_jones",
            "comment": "Stunning view!",
            "commented_time": "2024-08-10T13:00:00Z"
          },
          {
            "user_id": "11",
            "username": "evelyn_clark",
            "comment": "Fantastic outfits!",
            "commented_time": "2024-07-31T15:00:00Z"
          }
        ]
      },{
        "post_id": "112",
        "image_url":assets.feed6,
        "caption":"Wonderfull!",
        "posted_time": "2024-08-16T12:00:00Z",
        "likes": ["1", "2",],
        "comments": [
          {
            "user_id": "2",
            "username": "emily_jones",
            "comment": "Stunning view!",
            "commented_time": "2024-08-10T13:00:00Z"
          }
        ]
      },
    ],
    "following": ["2", "3", "4", "5"],
    "followers": ["4", "5"],
    "followRequest": ["2", "3","4"],
    "stories": [
      {
        "story_id": "201",
        "image_url": assets.story1,
        "posted_time": "2024-08-10T11:00:00Z",
        "viewed": true
      },
      {
        "story_id": "2011",
        "image_url": assets.story2,
        "posted_time": "2024-08-20T11:00:00Z",
        "viewed": true
      },
    ],
    savedPosts: [
      {
        "id": "1",
        "bookmarkPhoto": ["101"]
      },
      {
        "id": "2",
        "bookmarkPhoto": ["102"]
      },
      {
        "id": "3",
        "bookmarkPhoto": ["103"]
      },
      {
        "id": "4",
        "bookmarkPhoto": ["104"]
      }
    ]
  },
    {
      user_id: "2",
      username: "emily_jones",
      name: "Emily Jones",
      profile_image: assets.profile2,
      location: "Los Angeles, USA",
      followers_count: 300,
      following_count: 200,
      post_count: 10,
      description: "Fitness trainer and wellness coach",
      is_following: false,
      profile_visibility: "public",
      posts_visibility: "followers_only",
      followers_visibility: "public",
      following_visibility: "public",
      posts: [
        {
          post_id: "102",
          image_url: assets.feed2,
          caption: "Workout tips for beginners.",
          posted_time: "2024-08-09T18:00:00Z",
          likes: ["1", "3", "6"],
          comments: [
            {
              user_id: "3",
              username: "david_smith",
              comment: "Very informative!",
              commented_time: "2024-08-09T19:00:00Z"
            }
          ]
        }
      ],
      following: ["1", "4","5"],
      followers: ["3", "5"],
      followRequest: ["1", "4"],
      stories: [
        {
          story_id: "202",
          image_url: assets.profile7,
          posted_time: "2024-08-09T17:00:00Z",
          viewed: true
        }
      ]
    },
    {
      user_id: "3",
      username: "david_smith",
      name: "David Smith",
      profile_image: assets.profile3,
      location: "Chicago, USA",
      followers_count: 280,
      following_count: 160,
      post_count: 12,
      description: "Tech enthusiast and blogger",
      is_following: true,
      profile_visibility: "public",
      posts_visibility: "public",
      followers_visibility: "followers_only",
      following_visibility: "followers_only",
      posts: [
        {
          post_id: "103",
          image_url: assets.feed3,
          caption: "Latest tech trends.",
          posted_time: "2024-08-15T15:00:00Z",
          likes: ["2", "5", "7"],
          comments: [
            {
              user_id: "5",
              username: "john_doe",
              comment: "Great insights!",
              commented_time: "2024-08-08T16:00:00Z"
            }
          ]
        }
      ],
      following: ["1", "2"],
      followers: ["4", "6"],
      followRequest: ["1", "2"],
      stories: [
        {
          story_id: "203",
          image_url: assets.profile6,
          posted_time: "2024-08-08T14:00:00Z",
          viewed: false
        }
      ]
    },
    {
      user_id: "4",
      username: "alice_jones",
      name: "Alice Jones",
      profile_image: assets.profile4,
      location: "San Francisco, USA",
      followers_count: 290,
      following_count: 170,
      post_count: 14,
      description: "Digital marketer and content creator",
      is_following: false,
      profile_visibility: "public",
      posts_visibility: "followers_only",
      followers_visibility: "public",
      following_visibility: "public",
      posts: [
        {
          post_id: "104",
          image_url: assets.feed4,
          caption: "Marketing strategies for 2024.",
          posted_time: "2024-08-07T13:00:00Z",
          likes: ["1", "2", "6"],
          comments: [
            {
              user_id: "6",
              username: "lucas_miller",
              comment: "Very useful!",
              commented_time: "2024-08-07T14:00:00Z"
            }
          ]
        }
      ],
      following: ["2","3","4","5"],
      followers: ["1", "6"],
      followRequest: ["2", "5"],
      stories: [
        {
          story_id: "204",
          image_url:assets.profile6,
          posted_time: "2024-08-07T12:00:00Z",
          viewed: true
        }
      ]
    },
    {
      user_id: "5",
      username: "mark_brown",
      name: "Mark Brown",
      profile_image:assets.profile5,
      location: "Seattle, USA",
      followers_count: 320,
      following_count: 180,
      post_count: 15,
      description: "Food blogger and critic",
      is_following: true,
      profile_visibility: "public",
      posts_visibility: "public",
      followers_visibility: "followers_only",
      following_visibility: "followers_only",
      posts: [
        {
          post_id: "105",
          image_url: assets.feed5,
          caption: "Review of the best pizza in town.",
          posted_time: "2024-08-06T17:00:00Z",
          likes: ["1", "3", "7"],
          comments: [
            {
              user_id: "3",
              username: "david_smith",
              comment: "Great review!",
              commented_time: "2024-08-06T18:00:00Z"
            }
          ]
        }
      ],
      following: ["1", "2"],
      followers: ["3", "7"],
      followRequest: ["1", "2"],
      stories: [
        {
          story_id: "205",
          image_url:assets.profile6,
          posted_time: "2024-08-06T16:00:00Z",
          viewed: false
        }
      ]
    },
    {
      user_id: "6",
      username: "lucas_miller",
      name: "Lucas Miller",
      profile_image: assets.profile6,
      location: "Miami, USA",
      followers_count: 340,
      following_count: 190,
      post_count: 16,
      description: "Fashion designer and influencer",
      is_following: false,
      profile_visibility: "public",
      posts_visibility: "followers_only",
      followers_visibility: "public",
      following_visibility: "public",
      posts: [
        {
          post_id: "106",
          image_url:assets.feed6,
          caption: "Spring fashion trends.",
          posted_time: "2024-08-05T12:00:00Z",
          likes: ["2", "5", "9"],
          comments: [
            {
              user_id: "8",
              username: "sophia_williams",
              comment: "Love the outfits!",
              commented_time: "2024-08-05T13:00:00Z"
            }
          ]
        }
      ],
      following: ["3", "4"],
      followers: ["2", "8"],
      followRequest: ["3", "4"],
      stories: [
        {
          story_id: "206",
          image_url: assets.profile6,
          posted_time: "2024-08-05T11:00:00Z",
          viewed: true
        }
      ]
    },
    {
      user_id: "7",
      username: "michael_jordan",
      name: "Michael Jordan",
      profile_image: assets.profile7,
      location: "Houston, USA",
      followers_count: 350,
      following_count: 200,
      post_count: 20,
      description: "Basketball coach and commentator",
      is_following: true,
      profile_visibility: "public",
      posts_visibility: "public",
      followers_visibility: "followers_only",
      following_visibility: "followers_only",
      posts: [
        {
          post_id: "107",
          image_url: assets.feed7,
          caption: "Game highlights from last night.",
          posted_time: "2024-08-04T14:00:00Z",
          likes: ["4", "6", "10"],
          comments: [
            {
              user_id: "9",
              username: "natalie_taylor",
              comment: "Incredible performance!",
              commented_time: "2024-08-04T15:00:00Z"
            }
          ]
        }
      ],
      following: ["1", "5"],
      followers: ["2", "9"],
      followRequest: ["1", "5"],
      stories: [
        {
          story_id: "207",
          image_url:assets.profile7,
          posted_time: "2024-08-04T13:00:00Z",
          viewed: false
        }
      ]
    },
    {
      user_id: "8",
      username: "sophia_williams",
      name: "Sophia Williams",
      profile_image: assets.profile8,
      location: "Boston, USA",
      followers_count: 360,
      following_count: 210,
      post_count: 22,
      description: "Travel blogger and photographer",
      is_following: false,
      profile_visibility: "public",
      posts_visibility: "followers_only",
      followers_visibility: "public",
      following_visibility: "public",
      posts: [
        {
          post_id: "108",
          image_url: assets.feed1,
          caption: "Exploring the beautiful city of Paris.",
          posted_time: "2024-08-03T12:00:00Z",
          likes: ["3", "7", "11"],
          comments: [
            {
              user_id: "7",
              username: "michael_jordan",
              comment: "Looks amazing!",
              commented_time: "2024-08-03T13:00:00Z"
            }
          ]
        }
      ],
      following: ["3", "6"],
      followers: ["1", "7"],
      followRequest: ["3", "6"],
      stories: [
        {
          story_id: "208",
          image_url: assets.profile6,
          posted_time: "2024-08-03T11:00:00Z",
          viewed: true
        }
      ]
    },
    {
      user_id: "9",
      username: "natalie_taylor",
      name: "Natalie Taylor",
      profile_image: assets.profile9,
      location: "Atlanta, USA",
      followers_count: 370,
      following_count: 220,
      post_count: 25,
      description: "Lifestyle coach and author",
      is_following: true,
      profile_visibility: "public",
      posts_visibility: "public",
      followers_visibility: "followers_only",
      following_visibility: "followers_only",
      posts: [
        {
          post_id: "109",
          image_url:assets.feed3,
          caption: "10 tips for a healthier lifestyle.",
          posted_time: "2024-08-02T10:00:00Z",
          likes: ["2", "4", "8"],
          comments: [
            {
              user_id: "7",
              username: "michael_jordan",
              comment: "Very helpful!",
              commented_time: "2024-08-02T11:00:00Z"
            }
          ]
        }
      ],
      following: ["1", "4"],
      followers: ["2", "8"],
      followRequest: ["1", "4"],
      stories: [
        {
          story_id: "209",
          image_url: assets.profile9,
          posted_time: "2024-08-02T09:00:00Z",
          viewed: false
        }
      ]
    },
    {
      user_id: "10",
      username: "olivia_martin",
      name: "Olivia Martin",
      profile_image: assets.profile10,
      location: "Philadelphia, USA",
      followers_count: 380,
      following_count: 230,
      post_count: 30,
      description: "Music producer and artist",
      is_following: true,
      profile_visibility: "public",
      posts_visibility: "public",
      followers_visibility: "followers_only",
      following_visibility: "followers_only",
      posts: [
        {
          post_id: "110",
          image_url: assets.feed5,
          caption: "New track coming soon!",
          posted_time: "2024-08-01T16:00:00Z",
          likes: ["1", "5", "10"],
          comments: [
            {
              user_id: "9",
              username: "natalie_taylor",
              comment: "Can't wait to hear it!",
              commented_time: "2024-08-01T17:00:00Z"
            }
          ]
        }
      ],
      following: ["2", "5"],
      followers: ["3", "6"],
      followRequest: ["2", "5"],
      stories: [
        {
          story_id: "210",
          image_url: assets.profile6,
          posted_time: "2024-08-01T15:00:00Z",
          viewed: false
        }
      ]
    },
    {
      user_id: "11",
      username: "evelyn_clark",
      name: "Evelyn Clark",
      profile_image:assets.profile11,
      location: "San Diego, USA",
      followers_count: 390,
      following_count: 240,
      post_count: 35,
      description: "Fashion model and stylist",
      is_following: false,
      profile_visibility: "public",
      posts_visibility: "followers_only",
      followers_visibility: "public",
      following_visibility: "public",
      posts: [
        {
          post_id: "111",
          image_url: assets.feed,
          caption: "Summer fashion trends.",
          posted_time: "2024-07-31T14:00:00Z",
          likes: ["2", "4", "9"],
          comments: [
            {
              user_id: "8",
              username: "sophia_williams",
              comment: "Fantastic outfits!",
              commented_time: "2024-07-31T15:00:00Z"
            }
          ]
        }
      ],
      following: ["1", "6"],
      followers: ["2", "9"],
      followRequest: ["1", "6"],
      stories: [
        {
          story_id: "211",
          image_url:assets.profile6,
          posted_time: "2024-07-31T13:00:00Z",
          viewed: true
        }
      ]
    }
  ];
  