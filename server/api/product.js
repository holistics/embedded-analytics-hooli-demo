import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {

  const embed_code = "c333b136cdcf521e7fb62531";
  const secret_key = "21beff6ae9b238ff5382a96aaf78ca818b60c54c80f4e8a57c06c67cc7f11ecc61015c229c911a23341225118d134845c0205f061ded5ec05863ac38f360cda2"

  const expired_time = Math.floor(Date.now() / 1000) + (24 * 60 * 60 * 1000);
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