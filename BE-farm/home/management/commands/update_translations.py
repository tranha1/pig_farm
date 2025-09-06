from django.core.management.base import BaseCommand
from django.core.management import call_command
from django.conf import settings
import os


class Command(BaseCommand):
    help = 'Update Django translations for all configured languages'

    def add_arguments(self, parser):
        parser.add_argument(
            '--compile-only',
            action='store_true',
            help='Only compile existing .po files without updating them',
        )
        parser.add_argument(
            '--language',
            type=str,
            help='Update translations for specific language only',
        )

    def handle(self, *args, **options):
        languages = [options['language']] if options['language'] else [lang[0] for lang in settings.LANGUAGES]
        
        self.stdout.write(
            self.style.SUCCESS('🌐 Starting translation update process...')
        )

        for lang_code in languages:
            self.stdout.write(f'\n📝 Processing {lang_code} translations...')
            
            if not options['compile_only']:
                # Create/update .po files
                try:
                    call_command(
                        'makemessages',
                        locale=lang_code,
                        extensions=['html', 'txt', 'py'],
                        verbosity=1
                    )
                    self.stdout.write(
                        self.style.SUCCESS(f'✓ Updated .po files for {lang_code}')
                    )
                except Exception as e:
                    self.stdout.write(
                        self.style.ERROR(f'✗ Failed to update .po files for {lang_code}: {e}')
                    )
                    continue
            
            # Compile .po files to .mo files
            try:
                call_command('compilemessages', locale=lang_code, verbosity=1)
                self.stdout.write(
                    self.style.SUCCESS(f'✓ Compiled translations for {lang_code}')
                )
            except Exception as e:
                self.stdout.write(
                    self.style.ERROR(f'✗ Failed to compile translations for {lang_code}: {e}')
                )

        self.stdout.write('\n' + '='*50)
        self.stdout.write(
            self.style.SUCCESS('✅ Translation update completed!')
        )
        self.stdout.write('\n📋 Next steps:')
        self.stdout.write('   1. Review the .po files in locale/ directory')
        self.stdout.write('   2. Update any missing translations')
        self.stdout.write('   3. Run: python manage.py update_translations --compile-only')
        self.stdout.write('   4. Restart Django server to see changes')
        
        # Show locale directory
        locale_dir = os.path.join(settings.BASE_DIR, 'locale')
        if os.path.exists(locale_dir):
            self.stdout.write(f'\n📁 Translation files location: {locale_dir}')
        else:
            self.stdout.write(
                self.style.WARNING(f'\n⚠️  Locale directory not found at: {locale_dir}')
            )
