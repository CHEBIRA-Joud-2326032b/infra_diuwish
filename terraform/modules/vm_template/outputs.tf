output "vm_ip" {
  value = var.ip_address
}
output "vm_id" {
  value = proxmox_virtual_environment_vm.vm.vm_id
}