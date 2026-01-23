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
  default     = "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIILKKIWjYEvPSm8tT5k2S94V6qReeWcSUqlsbUZJVFzI"
}

variable "default_ci_user" {
  description = "Nom d'utilisateur Cloud Init"
  type    = string
  default = "admin_infra"

}

variable "node" {
  type    = string
  default = "node2"
}

variable "template_id" {
  type    = number
  default = 880000
}