# --- DNS MASTER ---
module "dns_01" {
  source = "./modules/vm_template"

  vm_name     = "dns-1"
  vm_id       = 111
  target_node = var.node
  template_id = var.template_id
  tags        = ["dns"]

  cores     = 1
  memory    = 512
  disk_size = 8

  networks = [{ bridge = "vmbr1", tag = 10 }] # VLAN 10

  ip_address     = "10.0.10.21/24"
  gateway        = "10.0.10.1"
  ssh_public_key = var.ssh_public_key
}

# --- DNS SLAVE ---
module "dns_02" {
  source = "./modules/vm_template"
  vm_name     = "dns-2"
  vm_id       = 112
  target_node = var.node
  template_id = var.template_id
  tags        = ["dns"]

  cores     = 1
  memory    = 512
  disk_size = 8

  networks       = [{ bridge = "vmbr1", tag = 10 }]
  ip_address     = "10.0.10.22/24"
  gateway        = "10.0.10.1"
  ssh_public_key = var.ssh_public_key
}

