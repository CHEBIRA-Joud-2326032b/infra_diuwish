# --- DHCP 01 ---
module "dhcp_01" {
  source = "./modules/vm_template"
  vm_name     = "dhcp-1"
  vm_id       = 881011
  target_node = var.node
  template_id = var.template_id
  tags        = ["dhcp"]

  ci_user = var.default_ci_user

  cores     = 1
  memory    = 512
  disk_size = 20

  networks       = [{ bridge = "vmbr10", tag = 10 }]
  ip_address     = "10.0.10.11/24"
  gateway        = "10.0.10.1"
  ssh_public_key = var.ssh_public_key
}

# --- DHCP 2 ---
module "dhcp_02" {
  source = "./modules/vm_template"
  vm_name     = "dhcp-2"
  vm_id       = 881012
  target_node = var.node
  template_id = var.template_id
  tags        = ["dhcp"]

  ci_user = var.default_ci_user

  cores     = 1
  memory    = 512
  disk_size = 20

  networks       = [{ bridge = "vmbr10", tag = 10 }]
  ip_address     = "10.0.10.12/24"
  gateway        = "10.0.10.1"
  ssh_public_key = var.ssh_public_key
}
