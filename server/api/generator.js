import jwt from 'jsonwebtoken';

const endpoints = [
  {
    name: 'business',
    embed_code: "6a6b2fffd59fa11a4ceaa60b",
    secret_key: "e781139269c25bea7cc1faaeb87ddb77ea2fa8331023267cffeb10761e2f33c30d448d48d148446fe256d5abb5298e12c4262c5ebfb977c2718624337721d3b4",
    settings: {
      "enable_export_data": false,
      "default_timezone": null,
      "allow_to_change_timezone": false,
      "hide_header_panel": true
    },
    getPermissions: (merchantId) => {
      return {
        "row_based": [
          {
            "path": {
              "dataset": "demo.ds_ecommerce",
              "model": "demo.dim_merchants",
              "field": "id"
            },
            "operator": "is",
            "modifier": null,
            "values": merchantId
          }
        ]
      };
    },
    filters: {},
    drillthroughs: {
      "88569": { 
      },
    },
  },
  {
    name: 'overview',
    embed_code: "46bb4fb08f14ac1497715cd2",
    secret_key: "2dbc4a9a5f85edfe2b4111cfb023411ec85ca3257ac2038f74abc5b654936fd22763fefed5ecda9d7ec0876c5bef6d0e24b7a2176d378f1a182fe8394d0fac4f",
    settings: {
      "enable_export_data": false,
      "default_timezone": null,
      "allow_to_change_timezone": false,
      "hide_header_panel": true
    },
    getPermissions: (merchantId) => {
      return {
        "row_based": [
          {
            "path": {
              "dataset": "demo.ds_ecommerce",
              "model": "demo.dim_merchants",
              "field": "id"
            },
            "operator": "is",
            "modifier": null,
            "values": merchantId
          }
        ]
      };
    },
    filters: {
      "f1": {
        "hidden": false,
        "default_condition": {
          "operator": "last",
          "values": [
            "3"
          ],
          "modifier": "month"
        }
      }
    },
    drillthroughs: {
      "88569": { 
      },
    },
  },
  {
    name: 'marketing',
    embed_code: "ba93db5151640b65f92b01b0",
    secret_key: "fe8fc8fddfb031a8eecb12f317393cb92f154b82e080b6d00eb2ab4c97f9621becd297012e1b8688080e39755813012f85acd3261943c98b75e3bf7f5fa89962",
    settings: {
      "enable_export_data": false,
      "default_timezone": null,
      "allow_to_change_timezone": false,
      "hide_header_panel": true
    },
    getPermissions: (merchantId) => {
      return {
        "row_based": [
          {
            "path": {
              "dataset": "demo.marketing_campaign",
              "model": "demo.marketing_kpi",
              "field": "merchant_id"
            },
            "operator": "is",
            "modifier": null,
            "values": merchantId
          }
        ]
      };
    },
    filters: {
      "f1": {
        "hidden": false,
        "default_condition": {
          "operator": "is",
          "values": [
            "youtube_blogger"
          ],
          "modifier": null
        }
      }
    }
  },
  {
    name: 'sale',
    embed_code: "69bf7c07e7d6a0cc619e231b",
    secret_key: "0c31cc7817c7ab6f8d8074bcb39023cc9fd605d6c9f975ad8843ee85cd362d77af7e8f07aeb6f5b99b24cbe9d2fab45d7d0506dde62d6f90f454da8c2400ceea",
    settings: {
      "enable_export_data": false,
      "default_timezone": null,
      "allow_to_change_timezone": false,
      "hide_header_panel": true
    },
    getPermissions: (merchantId) => {
      return {
        "row_based": [
          {
            "path": {
              "dataset": "demo.ds_ecommerce",
              "model": "demo.dim_merchants",
              "field": "id"
            },
            "operator": "is",
            "modifier": null,
            "values": merchantId
          }
        ]
      };
    },
    filters: {
      "f2": {
        "hidden": false,
        "default_condition": {
          "operator": "matches",
          "values": [
            null
          ],
          "modifier": null
        }
      },
      "f3": {
        "hidden": false,
        "default_condition": {
          "operator": "is",
          "values": [],
          "modifier": null
        }
      }
    },
    drillthroughs: {
      "88569": { 
      },
    },
  },
  {
    name: 'product',
    embed_code: "c333b136cdcf521e7fb62531",
    secret_key: "21beff6ae9b238ff5382a96aaf78ca818b60c54c80f4e8a57c06c67cc7f11ecc61015c229c911a23341225118d134845c0205f061ded5ec05863ac38f360cda2",
    settings: {
      "enable_export_data": false,
      "default_timezone": null,
      "allow_to_change_timezone": false,
      "hide_header_panel": true
    },
    getPermissions: (merchantId) => {
      return {
        "row_based": [
          {
            "path": {
              "dataset": "demo.ds_ecommerce",
              "model": "demo.dim_merchants",
              "field": "id"
            },
            "operator": "is",
            "modifier": null,
            "values": merchantId
          }
        ]
      };
    },
    filters: {
      "f1": {
        "hidden": false,
        "default_condition": {
          "operator": "is",
          "values": [],
          "modifier": null
        }
      },
      "f2": {
        "hidden": false,
        "default_condition": {
          "operator": "is",
          "values": [],
          "modifier": null
        }
      }
    }
  }
];

export function generateToken(name, merchantId) {
  const endpoint = endpoints.find(e => e.name === name);

  if (!endpoint) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Endpoint not found',
    });
  }

  if (!merchantId) {
    throw createError({
      statusCode: 401,
      statusMessage: 'No current merchant found',
    });
  }

  const expired_time = Math.floor(Date.now() / 1000) + (24 * 60 * 60);

  const payload = {
    settings: endpoint.settings,
    permissions: endpoint.getPermissions(merchantId),
    filters: endpoint.filters,
    drillthroughs: endpoint.drillthroughs,
    exp: expired_time
  };
  
  const token = jwt.sign(payload, endpoint.secret_key);

  return {
    embed_code: endpoint.embed_code,
    token
  };
}