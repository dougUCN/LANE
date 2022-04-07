# Interface registers of VME_FPGA
# D32

SIS3316_CONTROL_STATUS 	= 0x0 # r/w
SIS3316_MODID     	= 0x4 # read only
SIS3316_UDP_PROTOCOL_CONFIG     	     = 0x8 # r/w
SIS3316_INTERFACE_ACCESS_ARBITRATION_CONTROL = 0x10 # r/w
SIS3316_HARDWARE_VERSION	= 0x1C # read only


# VME FPGA
SIS3316_INTERNAL_TEMPERATURE_REG	= 0x20 # r/w
SIS3316_ONE_WIRE_CONTROL_REG    	= 0x24 # r/w
SIS3316_SERIAL_NUMBER_REG       = 0x28 # read only
SIS3316_ADC_FPGA_BOOT       = 0x30 # r/w
SIS3316_ADC_CLK_OSC_I2C_REG 	= 0x40 # r/w
SIS3316_SAMPLE_CLOCK_DISTRIBUTION_CONTROL	= 0x50 # r/w
SIS3316_NIM_CLK_MULTIPLIER_SPI_REG 	= 0x54 # r/w
SIS3316_FP_LVDS_BUS_CONTROL 		= 0x58 # r/w
SIS3316_NIM_INPUT_CONTROL_REG 		= 0x5C # r/w
SIS3316_ACQUISITION_CONTROL_STATUS 	= 0x60 # r/w
SIS3316_LEMO_OUT_CO_SELECT_REG	 = 0x70 # r/w
SIS3316_LEMO_OUT_TO_SELECT_REG	 = 0x74 # r/w
SIS3316_LEMO_OUT_UO_SELECT_REG	 = 0x78 # r/w
SIS3316_DATA_TRANSFER_GRP_CTRL_REG	 = 0x80 # r/w
SIS3316_DATA_TRANSFER_GRP_STATUS_REG  	= 0x90 # read
SIS3316_VME_FPGA_LINK_ADC_PROT_STATUS 	= 0xA0 # r/w
SIS3316_ADC_FPGA_SPI_BUSY_STATUS_REG 	= 0xA4     


# Key address registers
# D32, write only !
SIS3316_KEY_RESET 			= 0x400
SIS3316_KEY_USER_FUNCTION 	= 0x404
SIS3316_KEY_ARM	 = 0x410	# Arm sample logic (Single bank mode, not implemented)
SIS3316_KEY_DISARM	 = 0x414	# Disarm sample logic
SIS3316_KEY_TRIGGER	 = 0x418
SIS3316_KEY_TIMESTAMP_CLEAR	 = 0x41C
SIS3316_KEY_DISARM_AND_ARM_BANK1	 = 0x420
SIS3316_KEY_DISARM_AND_ARM_BANK2	 = 0x424
SIS3316_KEY_ENABLE_SAMPLE_BANK_SWAP_CONTROL_WITH_NIM_INPUT	 = 0x428 
SIS3316_KEY_ADC_FPGA_RESET	 = 0x434	# Reset ADC-FPGA logic (DDR-3 memory, FPGA-link interface)
SIS3316_KEY_ADC_CLOCK_DCM_RESET	 = 0x438 

# Clock multiplier register
SIS3316_NIM_CLK_MULTIPLIER_SPI_REG = 0x54 # r/w
