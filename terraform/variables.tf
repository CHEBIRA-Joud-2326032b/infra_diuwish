variable "pm_api_token" {
  description = "Token pour la connexion à l'API Proxmox VE (format: username@realm!id=secret)"
  type = string
  sensitive = true
}

variable "pm_api_url" {
  description = "Url d'accés à l'API Proxmox VE"
  type = string
}

variable "ssh_public_key" {
  description = "Clé SSH publique personnelle"
  type        = string
}

variable "default_ci_user" {
  description = "Nom d'utilisateur Cloud Init"
  type    = string
  default = "admin_infra"

}

variable "node" {
  type    = string
  default = "pve"
}

variable "template_id" {
  type    = number
  default = 8888
}