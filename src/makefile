OUTPUT_DIR := ../out

all: $(OUTPUT_DIR) html style scripts

html: $(OUTPUT_DIR)
	cp game.html $(OUTPUT_DIR)

style: $(OUTPUT_DIR)
	cp style/* $(OUTPUT_DIR)/style

scripts: $(OUTPUT_DIR)
	mkdir -p $(OUTPUT_DIR)/scripts
	cp scripts/* $(OUTPUT_DIR)/scripts

$(OUTPUT_DIR):	
	mkdir -p $(OUTPUT_DIR)

clean:
	rm -rf $(OUTPUT_DIR)