# --- GATEWAY MASTER ---
module "gateway_01" {
  source = "./modules/vm_template"

  vm_name     = "gateway-1"
  vm_id       = 101
  target_node = var.node
  template_id = var.template_id
  tags        = ["gateway"]

  cores  = 2
  memory = 1024

  networks = [
    { bridge = "vmbr0" }, # WAN
    { bridge = "vmbr1" }  # LAN
  ]

  ip_address = "10.0.0.11/24" # .10 sera la VIP Keepalived


  ssh_public_key = var.ssh_public_key
}

# --- GATEWAY BACKUP ---
module "gateway_02" {
  source = "./modules/vm_template"

  vm_name     = "gateway-2"
  vm_id       = 102
  target_node = var.node
  template_id = var.template_id
  tags        = ["gateway"]

  cores  = 2
  memory = 1024

  networks = [
    { bridge = "vmbr0" },
    { bridge = "vmbr1" }
  ]

  ip_address     = "10.0.0.12/24"
  ssh_public_key = var.ssh_public_key
}
