# for (i = 0; i < 20; i++) a += b
	li	x12, 0
	li	x10, 0
	li	x11, 10
for_loop:
	slti	x13, x12, 20			# x13 = x12 < 20
	beq	x13, zero, .exit_for_loop	# if x12 > 20, .exit_for_loop()
	add	x10, x10, x11			# a += b
	addi	x12, x12, 1			# i++
	beq	zero, zero, for_loop		# continue
.exit_for_loop:
	jalr	zero, 0(ra)