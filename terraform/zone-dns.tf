# --- DNS MASTER ---
module "dns_01" {
  source = "./modules/vm_template"

  vm_name     = "dns-1"
  vm_id       = 881021
  target_node = var.node
  template_id = var.template_id
  tags        = ["dns"]

  ci_user = var.default_ci_user

  cores     = 1
  memory    = 512

  networks = [{ bridge = "vmbr10", tag = 10 }] # VLAN 10

  ip_address     = "10.0.10.21/24"
  gateway        = "10.0.10.1"
  ssh_public_key = var.ssh_public_key
}

# --- DNS SLAVE ---
module "dns_02" {
  source = "./modules/vm_template"
  vm_name     = "dns-2"
  vm_id       = 881022
  target_node = var.node
  template_id = var.template_id
  tags        = ["dns"]

  ci_user = var.default_ci_user

  cores     = 1
  memory    = 512

  networks       = [{ bridge = "vmbr10", tag = 10 }]
  ip_address     = "10.0.10.22/24"
  gateway        = "10.0.10.1"
  ssh_public_key = var.ssh_public_key
}

