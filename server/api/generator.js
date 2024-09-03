import jwt from 'jsonwebtoken';

const endpoints = [
  {
    name: 'business',
    embed_code: "6a6b2fffd59fa11a4ceaa60b",
    secret_key: "e781139269c25bea7cc1faaeb87ddb77ea2fa8331023267cffeb10761e2f33c30d448d48d148446fe256d5abb5298e12c4262c5ebfb977c2718624337721d3b4",
    settings: {
      "enable_export_data": false,
      "default_timezone": null,
      "allow_to_change_timezone": false
    },
    getPermissions: (user) => {
      return {
        "row_based": [
          {
            "path": {
              "dataset": "demo.ds_ecommerce2",
              "model": "demo.dim_merchants",
              "field": "id"
            },
            "operator": "is",
            "modifier": null,
            "values": [user.merchantId]
          }
        ]
      };
    },
    filters: {}
  },
];

export function generateToken(name, user) {
  const endpoint = endpoints.find(e => e.name === name);
  console.log('endpoint: ', endpoint)

  if (!endpoint) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Endpoint not found',
    });
  }

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'No current user found',
    });
  }

  const expired_time = Math.floor(Date.now() / 1000) + (24 * 60 * 60);

  const payload = {
    settings: endpoint.settings,
    permissions: endpoint.getPermissions(user),
    filters: endpoint.filters,
    exp: expired_time
  };
  
  console.log(JSON.stringify(payload))
  const token = jwt.sign(payload, endpoint.secret_key);

  return {
    embed_code: endpoint.embed_code,
    token
  };
}