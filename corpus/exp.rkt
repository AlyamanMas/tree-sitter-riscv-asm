===========
Labels
===========

main:
	li	a0, 0x00000001
	li	a1, 0x00000001
	
	xor a2, a0, a1     # Compute the XOR result
  li  a3, 0x00000001  # Load 1 as a mask
  xor a2, a2, a3     # XOR the result with the mask to get XNOR

---

(source_file
  (label
    name: (identifier))
  (u_type_instruction
    name: (u_type_name)
    rd: (register)
    immediate: (immediate))
  (u_type_instruction
    name: (u_type_name)
    rd: (register)
    immediate: (immediate))
  (r_type_instruction
    name: (r_type_name)
    rd: (register)
    rs1: (register)
    rs2: (register))
  (u_type_instruction
    name: (u_type_name)
    rd: (register)
    immediate: (immediate))
  (r_type_instruction
    name: (r_type_name)
    rd: (register)
    rs1: (register)
    rs2: (register)))
