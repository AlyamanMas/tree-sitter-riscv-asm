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
  (instruction
    name: (instruction_name)
    (register)
    (immediate))
  (instruction
    name: (instruction_name)
    (register)
    (immediate))
  (instruction
    name: (instruction_name)
    (register)
    (register)
    (register))
  (instruction
    name: (instruction_name)
    (register)
    (immediate))
  (instruction
    name: (instruction_name)
    (register)
    (register)
    (register)))
