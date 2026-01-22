# --- RKE2 MASTERS (x3) ---
module "rke2_masters" {
  source = "./modules/vm_template"
  count  = 3

  vm_name     = "rke2-master-${count.index + 1}"
  vm_id       = 883050 + count.index + 1
  target_node = var.node
  template_id = var.template_id
  tags        = ["rke2", "master"]

  ci_user = var.default_ci_user

  cores     = 2
  memory    = 2048
  disk_size = 20

  networks       = [{ bridge = "vmbr10", tag = 30 }] # VLAN 30
  ip_address     = "10.0.30.1${count.index + 1}/24" # .11, .12, .13
  gateway        = "10.0.30.1"
  ssh_public_key = var.ssh_public_key
}

# --- RKE2 WORKERS (x2) ---
module "rke2_workers" {
  source = "./modules/vm_template"
  count  = 2

  vm_name     = "rke2-worker-${count.index + 1}"
  vm_id       = 883060 + count.index + 1
  target_node = var.node
  template_id = var.template_id
  tags        = ["rke2", "worker"]

  ci_user = var.default_ci_user

  cores     = 2
  memory    = 2048
  disk_size = 30   # Pour les images Docker et les volumes

  networks       = [{ bridge = "vmbr10", tag = 30 }]
  ip_address     = "10.0.30.2${count.index + 1}/24" # .21, .22
  gateway        = "10.0.30.1"
  ssh_public_key = var.ssh_public_key
}
