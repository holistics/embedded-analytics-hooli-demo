import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {

  const embed_code = "5c42e3e0d7f22d770a975fe5";
  const secret_key = "94ec72d62ae283fa2136b9b0a1d719761478937e2c5213182226b3d1cb54f1ee8171b49321ce015e5c106352d857ac27046f0ab56b7b8355e51a9efd9abdcf86"

  // Will expire after 1 day, change it to the value you want
  const expired_time = Math.floor(Date.now() / 1000) + (24 * 60 * 60);
  const settings = {
    "enable_export_data": false,
    "default_timezone": null,
    "allow_to_change_timezone": false
  };

  const permissions = {
    "row_based": []
  };

  const filters = {
    "f1": {
      "hidden": false,
      "default_condition": {
        "operator": "is",
        "values": [
          "Abernathy Group"
        ],
        "modifier": null
      }
    },
    "f2": {
      "hidden": false,
      "default_condition": {
        "operator": "matches",
        "values": [
          "last 2 years"
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
  };


  const payload = {
    settings: settings,
    permissions: permissions,
    filters: filters,
    exp: expired_time
  }

  const token = jwt.sign(payload, secret_key);

  return {
    embed_code,
    token
  }
})