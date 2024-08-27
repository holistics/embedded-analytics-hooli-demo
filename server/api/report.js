import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const embed_code = "594fb99b239d214d4cdd349d"
  const secret_key = "b16ac6773fe9a03bdb814c366535c43534069b63e38f531710d2d1381aa1dd281b649803cea6ced1e7899df352d005a12530a8540aa931f066d8e76dbec421ca"
  const expired_time = Math.floor(Date.now() / 1000) + (24 * 60 * 60 * 1000)

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
            "youtube_blogger"
        ],
        "modifier": null
        }
    }
  }

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