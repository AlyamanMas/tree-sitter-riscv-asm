=========
Jump
=========

add t0, s0, zero
addi t1, zero, 9
slli t1, t1, 2
add t1, t1, s1
L1: 
lw t2, 0(t0)
sw t2, 0(t1)
addi t0, t0, 4
addi t1, t1, -4
slt t3, t1, s1
j   L1

---

(source_file
  (r_type_instruction
    name: (r_type_name)
    rd: (register)
    rs1: (register)
    rs2: (register))
  (i_type_instruction
    name: (i_type_name)
    rd: (register)
    rs1: (register)
    immediate: (immediate))
  (i_type_instruction
    name: (i_type_name)
    rd: (register)
    rs1: (register)
    immediate: (immediate))
  (r_type_instruction
    name: (r_type_name)
    rd: (register)
    rs1: (register)
    rs2: (register))
  (label
    name: (identifier))
  (i_type_instruction
    name: (i_type_name)
    rd: (register)
    rs1: (register)
    immediate: (immediate))
  (s_type_instruction
    name: (s_type_name)
    rs1: (register)
    immediate: (immediate)
    rs2: (register))
  (i_type_instruction
    name: (i_type_name)
    rd: (register)
    rs1: (register)
    immediate: (immediate))
  (i_type_instruction
    name: (i_type_name)
    rd: (register)
    rs1: (register)
    immediate: (immediate))
  (r_type_instruction
    name: (r_type_name)
    rd: (register)
    rs1: (register)
    rs2: (register))
  )
