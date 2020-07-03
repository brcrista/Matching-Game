OUTPUT_DIR := out
SCRIPT_DIR := $(OUTPUT_DIR)/scripts
STYLE_DIR := $(OUTPUT_DIR)/style

.PHONY: all
all: $(OUTPUT_DIR)/game.html $(STYLE_DIR)/master.css $(SCRIPT_DIR)/script.js

$(OUTPUT_DIR):
	mkdir -p $(OUTPUT_DIR)

$(STYLE_DIR):
	mkdir -p $(STYLE_DIR)

$(SCRIPT_DIR):
	mkdir -p $(SCRIPT_DIR)

$(OUTPUT_DIR)/game.html: src/game.html $(OUTPUT_DIR)
	cp $< $(OUTPUT_DIR)

$(STYLE_DIR)/master.css: src/style/master.scss $(STYLE_DIR)
	sass $< $(STYLE_DIR)/master.css --no-source-map

$(SCRIPT_DIR)/script.js: src/scripts/*.ts $(SCRIPT_DIR)
	cd src/scripts && npm run build
	cp src/scripts/dist/* $(SCRIPT_DIR)

# Aliases to make it easy to run from the command line
.PHONY: html
html: $(OUTPUT_DIR)/game.html

.PHONY: css
css: $(STYLE_DIR)/master.css

.PHONY: js
js: $(SCRIPT_DIR)/script.js

.PHONY: clean
clean:
	rm -rf $(OUTPUT_DIR)
