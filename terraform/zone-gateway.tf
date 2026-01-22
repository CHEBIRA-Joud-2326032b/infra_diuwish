# --- GATEWAY MASTER ---
module "gateway_01" {
  source = "./modules/vm_template"

  vm_name     = "gateway-1"
  vm_id       = 880001
  target_node = var.node
  template_id = var.template_id
  tags        = ["gateway"]

  ci_user = var.default_ci_user

  cores  = 2
  memory = 1024

  networks = [
    { bridge = "vmbr0" }, # WAN
    { bridge = "vmbr10" }  # LAN
  ]

  ip_address = "10.0.0.11/24" # .10 sera la VIP Keepalived
  wan_ip      = "192.168.10.81/24"
  wan_gateway = "192.168.10.254"

  ssh_public_key = var.ssh_public_key
}

# --- GATEWAY BACKUP ---
module "gateway_02" {
  source = "./modules/vm_template"

  vm_name     = "gateway-2"
  vm_id       = 880002
  target_node = var.node
  template_id = var.template_id
  tags        = ["gateway"]

  cores  = 2
  memory = 1024

  networks = [
    { bridge = "vmbr0" },
    { bridge = "vmbr10" }
  ]

  ip_address     = "10.0.0.12/24"
  wan_ip      = "192.168.10.82/24"
  wan_gateway = "192.168.10.254"
  ssh_public_key = var.ssh_public_key
}
