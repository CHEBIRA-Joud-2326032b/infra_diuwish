# --- BASTION (TELEPORT) ---
module "bastion" {
  source = "./modules/vm_template"

  vm_name     = "bastion"
  vm_id       = 882031
  target_node = var.node
  template_id = var.template_id
  tags        = ["bastion"]

  ci_user = var.default_ci_user

  cores     = 2
  memory    = 2048
  disk_size = 20

  networks       = [{ bridge = "vmbr10", tag = 20 }] # VLAN 20
  ip_address     = "10.0.20.11/24"
  gateway        = "10.0.20.1"
  ssh_public_key = var.ssh_public_key
}




