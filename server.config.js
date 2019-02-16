const ServerConfig = {
  USE_NTLM: false,
  USE_SSPI: true,
  DOMAIN_CONTROLLER: 'ldap://10.1.1.110:389',
  DOMAIN: 'BPMO.LOCAL',
  DOMAIN_USER_PREFIX: 'BPMO'
}

module.exports = ServerConfig
