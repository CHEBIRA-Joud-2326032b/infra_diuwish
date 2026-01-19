# --- MONITORING ---
module "monitoring" {
  source = "./modules/vm_template"

  vm_name     = "monitoring"
  vm_id       = 221
  target_node = var.node
  template_id = var.template_id
  tags        = ["monitoring"]

  cores     = 2
  memory    = 2048
  disk_size = 30

  networks       = [{ bridge = "vmbr1", tag = 20 }]
  ip_address     = "10.0.20.31/24"
  gateway        = "10.0.20.1"
  ssh_public_key = var.ssh_public_key
}
