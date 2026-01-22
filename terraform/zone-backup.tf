# --- BACKUP SERVER (PBS) ---
module "pbs_server" {
  source = "./modules/vm_template"

  vm_name     = "backup"
  vm_id       = 884063
  target_node = var.node
  template_id = var.template_id
  tags        = ["backup"]

  ci_user = var.default_ci_user

  cores     = 1
  memory    = 1024
  disk_size = 100 # Gros disque pour stocker les sauvegardes

  networks       = [{ bridge = "vmbr10", tag = 40 }]
  ip_address     = "10.0.40.21/24"
  gateway        = "10.0.40.1"
  ssh_public_key = var.ssh_public_key

}
