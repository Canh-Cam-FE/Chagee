export const form = {
	select2: function () {
		$('.form-group select').each(function () {
			const placeholder = $(this).attr('placeholder');
			$(this).select2({
				placeholder: placeholder,
				allowClear: true,
				language: {
					noResults: function () {
						return "Không có kết quả";
					}
				}
			});
		});
	},
	add_bookmark: function () {
		$('.bookmark').on('click', function () {
			const $this = $(this);
			const isAdded = $this.hasClass('added');
			
			// Clear existing timeout for this element
			const existingTimeout = $this.data('timeoutId');
			if (existingTimeout) {
				clearTimeout(existingTimeout);
			}
			
			if (isAdded) {
				$this.removeClass('added');
			} else {
				$this.addClass('added-motion added');
				const timeoutId = setTimeout(() => {
					$this.removeClass('added-motion');
				}, 700);
				$this.data('timeoutId', timeoutId);
			}
		});
	},
	date_picker: function () {
		$('.input-date-picker input').each(function () {
			$(this).daterangepicker({
				singleDatePicker: true,
				parentEl: $(this).parent(),
				autoApply: true,
				autoUpdateInput: false,
				locale: {
					format: 'DD/MM/YYYY',
					separator: ' - ',
					applyLabel: 'Áp dụng',
					cancelLabel: 'Hủy',
					fromLabel: 'Từ',
					toLabel: 'Đến',
					customRangeLabel: 'Tùy chọn',
					weekLabel: 'T',
					daysOfWeek: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
					monthNames: [
						'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
						'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
					],
					firstDay: 1 // Monday as first day of week
				}
			});
			$(this).on('apply.daterangepicker', function (ev, picker) {
				const date = picker.startDate.format('DD/MM/YYYY');
				$(this).val(date);
			});
		});
	},
	input_file: function () {
		$('.form-input-file input[type="file"]').each(function () {
			const $fileInput = $(this);
			const placeholder = $fileInput.attr('placeholder') || 'Chọn file';
			
			// Hide the original file input
			$fileInput.css({
				opacity: 0,
				width: 0,
				height: 0,
				position: 'absolute',
				left: '-1000px'
			});
			
			// Create the custom file input structure
			const customHTML = `
				<div class="custom-file-input">
					<input type="text" readonly placeholder="${placeholder}" class="file-display">
					<button type="button" class="file-upload-btn"></button>
				</div>
			`;
			
			$fileInput.after(customHTML);
			
			const $customInput = $fileInput.next('.custom-file-input');
			const $displayInput = $customInput.find('.file-display');
			const $uploadBtn = $customInput.find('.file-upload-btn');
			
			// Handle button click to trigger file input
			$uploadBtn.on('click', function (e) {
				e.preventDefault();
				$fileInput.trigger('click');
			});
			
			// Handle display input click to trigger file input
			$displayInput.on('click', function () {
				$fileInput.trigger('click');
			});
			
			// Handle file selection
			$fileInput.on('change', function () {
				const fileName = $(this).val().replace(/.*[\/\\]/, '');
				if (fileName) {
					$displayInput.val(fileName);
				} else {
					$displayInput.val('');
				}
			});
		});
	},
	validate: function () {
		// Set default messages in Vietnamese
		$.extend($.validator.messages, {
			required: 'Trường này là bắt buộc',
			email: 'Email không đúng định dạng',
			url: 'URL không đúng định dạng',
			date: 'Ngày không đúng định dạng',
			number: 'Vui lòng nhập số',
			digits: 'Vui lòng chỉ nhập chữ số',
			minlength: $.validator.format('Vui lòng nhập ít nhất {0} ký tự'),
			maxlength: $.validator.format('Vui lòng nhập không quá {0} ký tự')
		});

		$('.wrap-form-recruitment').validate({
			errorPlacement: function(error, element) {
				console.log("🚀 ~ element:", element)
				// Find the closest form-group and append error
				const $formGroup = element.closest('.form-group');
				if ($formGroup.length) {
					error.appendTo($formGroup);
				} else {
					// Fallback for radio buttons
					const $wrapCheckbox = element.closest('.wrap-checkboxs');
					if ($wrapCheckbox.length) {
						error.appendTo($wrapCheckbox);
					}
				}
			},
			highlight: function(element, errorClass, validClass) {
				const $element = $(element);
				const $formGroup = $element.closest('.form-group');
				
				// Remove valid class and add invalid class
				$formGroup.removeClass('valid').addClass('invalid');
				
				// Handle Select2 specifically
				if ($element.hasClass('select2-hidden-accessible')) {
					$element.next('.select2-container').addClass('invalid');
				}
			},
			unhighlight: function(element, errorClass, validClass) {
				const $element = $(element);
				const $formGroup = $element.closest('.form-group');
				
				// Remove invalid class and add valid class
				$formGroup.removeClass('invalid').addClass('valid');
				
				// Handle Select2 specifically  
				if ($element.hasClass('select2-hidden-accessible')) {
					$element.next('.select2-container').removeClass('invalid').addClass('valid');
				}
			},
			submitHandler: function(form) {
				// Handle form submission here
				console.log('Form is valid and ready to submit');
				// form.submit(); // Uncomment to actually submit
			}
		});
		
		// Add validation to Select2 change events
		$('.form-group select').on('change', function() {
			$(this).valid();
		});
		
		// Add validation to Select2 clear events
		$('.form-group select').on('select2:clear', function() {
			$(this).valid();
		});
		
		// Add validation to file input change events
		$('.form-input-file input[type="file"]').on('change', function() {
			$(this).valid();
		});
	},
	init: function () {
		this.select2();
		this.add_bookmark();
		this.date_picker();
		this.input_file();
		this.validate();
	}
}