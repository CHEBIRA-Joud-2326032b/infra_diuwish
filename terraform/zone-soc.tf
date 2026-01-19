# --- SOC (WAZUH) ---
module "soc" {
  source = "./modules/vm_template"

  vm_name     = "soc"
  vm_id       = 202
  target_node = var.node
  template_id = var.template_id
  tags        = ["ops", "security", "heavy"]

  cores              = 2
  memory             = 4096 # Wazuh a faim
  disable_ballooning = true # Vital pour Java
  disk_size          = 50   # Logs

  networks       = [{ bridge = "vmbr1", tag = 20 }]
  ip_address     = "10.0.20.21/24"
  gateway        = "10.0.20.1"
  ssh_public_key = var.ssh_public_key
}
