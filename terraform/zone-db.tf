# --- DB PRIMARY ---
module "db_primary" {
  source = "./modules/vm_template"

  vm_name     = "db-primary"
  vm_id       = 884001
  target_node = var.node
  template_id = var.template_id
  tags        = ["data"]

  ci_user = var.default_ci_user

  cores              = 2
  memory             = 1536
  disable_ballooning = true # Vital pour Postgres
  disk_size          = 20

  networks       = [{ bridge = "vmbr10", tag = 40 }] # VLAN 40
  ip_address     = "10.0.40.11/24"
  gateway        = "10.0.40.1"
  ssh_public_key = var.ssh_public_key
}

# --- DB STANDBY ---
module "db_standby" {
  source = "./modules/vm_template"
  vm_name     = "db-standby"
  vm_id       = 884062
  target_node = var.node
  template_id = var.template_id
  tags        = ["data"]

  ci_user = var.default_ci_user

  cores              = 2
  memory             = 1536
  disable_ballooning = true
  disk_size          = 20

  networks       = [{ bridge = "vmbr10", tag = 40 }]
  ip_address     = "10.0.40.12/24"
  gateway        = "10.0.40.1"
  ssh_public_key = var.ssh_public_key
}


