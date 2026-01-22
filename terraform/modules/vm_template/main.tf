terraform {
  required_version = ">= 1.14.0"
  required_providers {
    proxmox = {
      source  = "bpg/proxmox"
      version = ">= 0.93.0"
    }
  }
}
resource "proxmox_virtual_environment_vm" "vm" {
  name      = var.vm_name
  node_name = var.target_node
  vm_id     = var.vm_id
  tags      = var.tags
  pool_id   = var.pool_id

  agent {
    enabled = true
    trim    = true
  }

  stop_on_destroy = true

  cpu {
    cores = var.cores
    type = "x86-64-v2-AES"
  }

  memory {
    dedicated = var.memory
    floating  = var.disable_ballooning ? var.memory : 0
  }

  disk {
    datastore_id = var.storage_id
    interface    = "scsi0"
    size         = var.disk_size
    discard      = "on"
    iothread     = true
    cache        = "writeback"
    ssd          = true
  }

  scsi_hardware = "virtio-scsi-single"

  operating_system {
    type = "l26"
  }

  clone {
    vm_id = var.template_id
  }

  dynamic "network_device" {
    for_each = var.networks
    content {
      bridge   = network_device.value.bridge
    }
  }

  initialization {
    datastore_id = var.storage_id

    ip_config {
      ipv4 {
        address = var.ip_address
        gateway = var.gateway != "" ? var.gateway : null
      }
    }

    user_account {
      username = var.ci_user
      keys     = [var.ssh_public_key]
    }
  }

}