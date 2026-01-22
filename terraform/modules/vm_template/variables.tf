variable "vm_name" {
  description = "Le nom de la machine virtuelle (ex: gateway)"
  type        = string
}

variable "target_node" {
  description = "Le nom du noeud Proxmox (ex: pve)"
  type        = string
  default     = "node1"
}

variable "vm_id" {
  description = "L'ID unique de la VM (ex: 100)"
  type        = number
}

variable "template_id" {
  description = "L'ID de la VM Template (ex: 8888)"
  type        = number
}

variable "tags" {
  description = "Liste des tags pour organiser l'interface Proxmox"
  type        = list(string)
  default     = ["terraform"]
}

variable "cores" {
  description = "Nombre de coeurs CPU"
  type        = number
  default     = 2
}

variable "memory" {
  description = "Quantité de RAM en Mo"
  type        = number
  default     = 1024
}

variable "disk_size" {
  description = "Taille du disque en Go"
  type        = number
  default     = 10
}

variable "storage_id" {
  description = "ID du stockage Proxmox (ex: local-lvm)"
  type        = string
  default     = "local-lvm"
}

variable "networks" {
  description = "Liste des interfaces réseaux. Permet de mettre 1 ou plusieurs cartes."
  type = list(object({
    bridge = string
  }))
  default = [
    { bridge = "vmbr1" }
  ]
}

variable "ci_user" {
  description = "Utilisateur par défaut à créer"
  type        = string
  default     = "admin_infra"
}

variable "ssh_public_key" {
  description = "La clé SSH publique à injecter"
  type        = string
}

variable "ip_address" {
  description = "Adresse IP format CIDR (ex: 10.0.0.1/24)"
  type        = string
}

variable "gateway" {
  description = "Passerelle par défaut (ex: 10.0.0.1). vide pour la Gateway elle-même."
  type        = string
  default     = ""
}

variable "disable_ballooning" {
  description = "Si true, empêche Proxmox de réduire la RAM de la VM"
  type        = bool
  default     = false
}

variable "pool_id" {
  type        = string
  description = "Resource Pool (ex: Groupe67-B2)"
  default     = "Groupe67-B2"
}

variable "wan_ip" {
  description = "IP CIDR pour l'interface WAN (eth1). Si vide, pas d'interface WAN."
  type        = string
  default     = ""
}

variable "wan_gateway" {
  description = "passerelle internet"
  type        = string
  default     = ""
}